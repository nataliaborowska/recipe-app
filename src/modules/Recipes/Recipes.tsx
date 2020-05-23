import React from 'react';
import {Col, Row, Typography, Spin} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import {RecipeCard} from './components/RecipeCard';
import {withAuthorization} from '../../common/withAuthorization';
import {fetchRecipesList, removeRecipesList} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {RecipeFilters} from './components/RecipeFilters';
import {withFirebase, IFirebase} from '../../components/Firebase';
import {cuisineNamesSelector, ingredientListSelector, recipeNamesSelector, recipesListSelector} from '../../store/selectors';

import styles from './Recipes.module.scss';

const mapStateToProps = (state: IStoreState) => {
  return {
    cuisineNamesList: cuisineNamesSelector(state),
    ingredientsList: ingredientListSelector(state),
    recipeNamesList: recipeNamesSelector(state),
    recipesList: recipesListSelector(state),
    recipeIsLoading: state.recipe.recipeIsLoading,
    recipeError: state.recipe.recipeError,
  }
}

const mapDispatchToProps = {fetchRecipesList, removeRecipesList};

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

class Recipes extends React.Component<IPropTypes, IState> {
  state = {
    selectedCuisine: [],
    selectedIngredients: [],
    selectedRecipes: [],
  }

  componentDidMount() {
    this.props.fetchRecipesList(this.props.firebase);
  }

  // static getDerivedStateFromProps(previousProps: IPropTypes, previousState: IState) {
  //   // console.warn("previousProps", previousProps.recipesList, "previousState", previousState)

  //   if (previousProps.recipesList.length > 0 &&
  //     (previousState.selectedIngredients.length === 0 && previousState.selectedRecipes.length === 0)) {
  //     const ingredientList: Array<any> = [];
  //     previousProps.recipesList.forEach((recipe: any) => ingredientList.push(...recipe.ingredients));
  //     const finalIngredientList = ingredientList.filter((prevIngredient, nextIngredient) => prevIngredient !== nextIngredient);

  //     return {
  //       selectedRecipes: previousProps.recipesList.map((recipe: any) => recipe.name),
  //       selectedIngredients: finalIngredientList,
  //     }
  //   }
  // }

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

  calculateFilterArray = (filteredArray1: Array<string>, filteredArray2: Array<string>) => {
    if (filteredArray2.length > 0) {
      const filteredArrayCombined = filteredArray1.map((filteredArray1Item: any) => {
        return filteredArray2.map(filteredArray2Item => `${filteredArray1Item}_${filteredArray2Item}`);
      });

      return ([] as Array<string>).concat(...filteredArrayCombined);
    }

    return filteredArray1;
  }

  get filterValue() {
    let filterArray: Array<string> = [];
    if (this.state.selectedRecipes.length > 0) {
      let filterArrayWithName: Array<Array<string>> = [];
      filterArray = [...this.state.selectedRecipes];

      if (this.state.selectedCuisine.length > 0) {
        filterArray = this.calculateFilterArray(this.state.selectedCuisine, this.state.selectedIngredients);
      } else {
        if (this.state.selectedIngredients.length > 0) {
          filterArray = [...this.state.selectedIngredients];
        }
      }

      if (this.state.selectedCuisine.length > 0 || this.state.selectedIngredients.length > 0) {
        filterArrayWithName = filterArray.map(filter => {
          return this.state.selectedRecipes.map(recipe => `${recipe}_${filter}`);
        });

        filterArray = ([] as Array<string>).concat(...filterArrayWithName);
      }
    } else {
      if (this.state.selectedCuisine.length > 0) {
        filterArray = this.calculateFilterArray(this.state.selectedCuisine, this.state.selectedIngredients);
        // filterArray = [...this.state.selectedCuisine];

        // if (this.state.selectedIngredients.length > 0) {
        //   let filterArrayWithCuisineIngredients: Array<Array<string>>;

        //   filterArrayWithCuisineIngredients = filterArray.map((filter: any) => {
        //     return this.state.selectedIngredients.map(ingredient => `${filter}_${ingredient}`);
        //   });

        //   filterArray = ([] as Array<string>).concat(...filterArrayWithCuisineIngredients);
        // }
      } else {
        if (this.state.selectedIngredients.length > 0) {
          filterArray = [...this.state.selectedIngredients];
        }
      }
    }


    return filterArray;
    // name_cuisineType: filterNameCousine,
    //   name_ingredients: filterNameIngredients,
    //     cuisineType_ingredients: filterCuisineIngredients,
    //       name_cuisineType_ingredients: filterNameCuisineIngredients,
  }

  render() {
    console.warn(this.filterValue);
    if (this.props.recipeIsLoading) {
      return <Spin />;
    }

    if (this.props.recipesList.length > 0) {
      return (
        <div className={styles.recipes}>
          <Typography.Title>Recipes List</Typography.Title>

          <RecipeFilters
            recipeNamesList={this.props.recipeNamesList}
            ingredientsList={this.props.ingredientsList}
            cuisineNamesList={this.props.cuisineNamesList}
            onNameSearch={this.onNameSearch}
            onCuisineSearch={this.onCuisineSearch}
            onIngredientsSearch={this.onIngredientsSearch}
          />

          <Row gutter={16}>
            {this.props.recipesList.map((recipe: any) => (
              <Col
                key={uuidv4()}
                span={6}
              >
                <RecipeCard {...recipe} />
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    return <Typography.Paragraph>No recipes to display</Typography.Paragraph>;
  }
}

const WrappedComponent = connector(withAuthorization(withFirebase(Recipes)));

export {WrappedComponent as Recipes};