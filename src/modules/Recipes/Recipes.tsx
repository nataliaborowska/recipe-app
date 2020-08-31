import React from 'react';
import {Col, Row, Typography, Spin} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import {RecipeCard} from './components/RecipeCard';
import {withAuthorization} from '../../common/withAuthorization';
import {
  deleteRecipe,
  fetchRecipesList,
  removeRecipesList,
  setRecipeFilters
} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {RecipeFilters} from './components/RecipeFilters';
import {withFirebase, IFirebase} from '../../components/Firebase';
import {
  cuisineNamesSelector,
  filteredRecipesSelector,
  ingredientListSelector,
  recipeNamesSelector,
  recipesListSelector,
} from '../../store/selectors';

const mapStateToProps = (state: IStoreState) => {
  return {
    cuisineNamesList: cuisineNamesSelector(state),
    ingredientsList: ingredientListSelector(state),
    recipeNamesList: recipeNamesSelector(state),
    recipesList: recipesListSelector(state),
    recipeIsLoading: state.recipe.recipeIsLoading,
    recipeError: state.recipe.recipeError,
    filteredRecipes: filteredRecipesSelector(state),
  }
}

const mapDispatchToProps = {deleteRecipe, fetchRecipesList, removeRecipesList, setRecipeFilters};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux {
  firebase: IFirebase;
}

interface IState {
  selectedCuisine: Array<string>;
  selectedIngredients: Array<string>;
  selectedRecipes: Array<string>;
}

export class RecipesUnwrapped extends React.Component<IPropTypes, IState> {
  state = {
    selectedCuisine: [],
    selectedIngredients: [],
    selectedRecipes: [],
  }

  componentDidMount() {
    this.props.fetchRecipesList(this.props.firebase);
  }

  componentDidUpdate() {
    this.props.setRecipeFilters(this.state.selectedRecipes, this.state.selectedCuisine, this.state.selectedIngredients);
  }

  componentWillUnmount() {
    this.props.removeRecipesList(this.props.firebase);
  }

  onNameSearch = (value: Array<string>) => {
    this.setState({
      selectedRecipes: value,
    });
  }

  onCuisineSearch = (value: Array<string>) => {
    this.setState({
      selectedCuisine: value,
    });
  }

  onIngredientsSearch = (value: Array<string>) => {
    this.setState({
      selectedIngredients: value,
    });
  }

  render() {
    if (this.props.recipeIsLoading) {
      return <Spin />;
    }

    return (
      <div data-test="component-recipes">
        <Typography.Title>Recipes List</Typography.Title>

        <RecipeFilters
          recipeNamesList={this.props.recipeNamesList}
          ingredientsList={this.props.ingredientsList}
          cuisineNamesList={this.props.cuisineNamesList}
          onNameSearch={this.onNameSearch}
          onCuisineSearch={this.onCuisineSearch}
          onIngredientsSearch={this.onIngredientsSearch}
        />

        {this.props.filteredRecipes ?
          <Row gutter={16}>
            {this.props.filteredRecipes.map((recipe: any) => (
              <Col
                key={uuidv4()}
                span={6}
              >
                <RecipeCard {...recipe} handleDeleteRecipe={this.props.deleteRecipe} />
              </Col>
            ))}
          </Row>
          :
          <Typography.Paragraph>No recipes to display</Typography.Paragraph>
        }
      </div>
    );
  }
}

export const RecipesConnected = connector(RecipesUnwrapped);

const WrappedComponent = withAuthorization(withFirebase(RecipesConnected));

export {WrappedComponent as Recipes};