import React, {Props} from 'react';
import {Col, Row, Typography, Spin} from 'antd';
import {connect, ConnectedProps} from 'react-redux';

import {RecipeCard} from './RecipeCard';
import {withAuthorization} from '../../common/withAuthorization';
import {fetchRecipesList} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {withFirebase, IFirebase} from '../../components/Firebase';

import styles from './RecipesList.module.scss';

const mapStateToProps = (state: IStoreState) => {
  return {
    recipesList: state.recipe.recipesList,
    recipeIsLoading: state.recipe.recipeIsLoading,
    recipeError: state.recipe.recipeError,
  }
}

const mapDispatchToProps = {fetchRecipesList};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux {
  firebase: IFirebase;
}

class RecipesList extends React.Component<IPropTypes>{
  componentDidMount() {
    this.props.fetchRecipesList(this.props.firebase);
  }

  render() {
    if (this.props.recipeIsLoading) {
      return <Spin />;
    }

    if (this.props.recipesList) {
      return (
        <div className={styles.recipesList}>
          <Typography.Title>Recipes List</Typography.Title>

          <Row gutter={16}>
            {this.props.recipesList.map(recipe => (
              <Col span={6}>
                <RecipeCard {...recipe} />
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    return <Typography.Paragraph>There was a problem loading the data</Typography.Paragraph>;
  }
}

const WrappedComponent = connector(withAuthorization(withFirebase(RecipesList)));

export {WrappedComponent as RecipesList};