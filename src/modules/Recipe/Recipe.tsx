import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Col, Divider, Row, Statistic, Typography, Spin} from 'antd';
import {connect, ConnectedProps} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {withAuthorization} from '../../common/withAuthorization';
import {IFirebase, withFirebase} from '../../components/Firebase';
import {deleteRecipe, fetchRecipeData} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {RecipeLinks} from './RecipeLinks';

import styles from './Recipe.module.scss';

const mapStateToProps = (state: IStoreState) => {
  return {
    recipeData: state.recipe.recipeData,
    recipeIsLoading: state.recipe.recipeIsLoading,
    recipeError: state.recipe.recipeError,
  };
}

const mapDispatchToProps = {deleteRecipe, fetchRecipeData};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMatchParams {
  recipeId: string;
}

interface IPropTypes extends PropsFromRedux, RouteComponentProps<IMatchParams> {
  firebase: IFirebase;
}

export class RecipeUnwrapped extends React.Component<IPropTypes> {
  componentDidMount() {
    this.props.fetchRecipeData(this.recipeId, this.props.firebase);
  }

  get recipeId() {
    return this.props.match.params.recipeId;
  }

  handleDeleteClick = () => {
    if (this.recipeId) {
      this.props.deleteRecipe(this.recipeId, this.props.firebase);

      this.props.history.push(`${AppRoutesEnum.RECIPES}`);
    }
  }

  render() {
    if (this.props.recipeIsLoading) {
      return <Spin />;
    }

    if (this.props.recipeData) {
      return (
        <div className={styles.recipeWrapper} data-test="component-recipe">
          <RecipeLinks
            recipeId={this.recipeId}
            onDeleteClick={this.handleDeleteClick}
          />

          <Row gutter={16}>
            <Col span={12}>
              <Typography.Title>{this.props.recipeData.name}</Typography.Title>

              {/* <span className={styles.recipeRating}>
                <Rate value={this.props.recipeData.rating} />

                ({this.props.recipeData.rating})
              </span> */}

              <Typography.Paragraph ellipsis={{rows: 4, expandable: true}}>
                Cuisine: {this.props.recipeData.cuisineType}
              </Typography.Paragraph>

              <Typography.Paragraph ellipsis={{rows: 4, expandable: true}}>
                {this.props.recipeData.description}
              </Typography.Paragraph>

              <Row className={styles.recipeStats} gutter={8}>
                <Col span={8} className={styles.recipeData}>
                  <Statistic
                    title="ingredients"
                    value={this.props.recipeData.ingredients.length}
                  />
                </Col>

                <Col span={8} className={styles.recipeData}>
                  <Statistic
                    title="prep time"
                    value={this.props.recipeData.preparationTime}
                  />
                </Col>

                <Col span={8} className={styles.recipeData}>
                  <Statistic
                    title="Calories"
                    value={this.props.recipeData.calories}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <img
                alt={this.props.recipeData.name}
                className={styles.recipeImage}
              // src={this.props.recipeData.image}
              />
            </Col>
          </Row>

          <Divider />

          <Typography.Title level={2}>Ingredients ({this.props.recipeData.servings} servings)</Typography.Title>

          <ul className={styles.ingredientsList}>
            {this.props.recipeData.ingredients.map((ingredient: string) => (
              <li
                className={styles.ingredientsListItem}
                key={uuidv4()}
              >
                {ingredient}
              </li>
            ))}
          </ul>

          <Typography.Title level={2}>Directions</Typography.Title>

          <ol className={styles.directionsList}>
            {this.props.recipeData.instructions.map((instruction: string) => (
              <li
                className={styles.directionsListItem}
                key={uuidv4()}
              >
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      );
    }

    return (
      <div data-test="component-recipe">
        <Typography.Paragraph>There was a problem loading the data</Typography.Paragraph>
      </div>
    );
  }
}

export const RecipeConnected = connector(RecipeUnwrapped);

const WrappedComponent = withAuthorization(withFirebase(withRouter(RecipeConnected)));

export {WrappedComponent as Recipe};