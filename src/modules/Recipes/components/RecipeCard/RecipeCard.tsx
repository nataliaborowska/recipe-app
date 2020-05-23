import React from 'react';
import {Button, Card} from 'antd';
import {ClockCircleOutlined, DeleteOutlined, EditOutlined, FireOutlined, EyeOutlined} from '@ant-design/icons';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppRoutesEnum} from '../../../../utils/AppRoutesEnum';
import {deleteRecipe} from '../../../../store/actions/recipeActions/recipe';
import {IFirebase, withFirebase} from '../../../../components/Firebase';
import {IRecipeData} from '../../../../store/reducers/recipeReducer';

import styles from './RecipeCard.module.scss';

const mapDispatchToProps = {deleteRecipe}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends IRecipeData, PropsFromRedux {
  firebase: IFirebase;
}

const RecipeCard: React.FC<IPropTypes> = (props) => {
  const onDeleteClick = () => {
    if (props.recipeId) {
      props.deleteRecipe(props.recipeId, props.firebase);
    }
  }

  return (
    <Card
      bodyStyle={{padding: '0'}}
      className={styles.recipeCard}
      cover={<img alt="example" src="https://www.stevensegallery.com/640/360" />}
      hoverable
    >
      <div className={styles.recipeActions}>
        <Link
          className={styles.recipeAction}
          to={`${AppRoutesEnum.RECIPES}/${props.recipeId}`}
        >
          <EyeOutlined />
        </Link>

        <Link
          className={styles.recipeAction}
          to={`${AppRoutesEnum.EDIT_RECIPE}/${props.recipeId}`}
        >
          <EditOutlined />
        </Link>

        <Button
          className={styles.recipeAction}
          onClick={onDeleteClick}
          style={{padding: 0}}
          type="link"
        >
          <DeleteOutlined />
        </Button>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.recipeData}>
          <div>
            <ClockCircleOutlined style={{marginRight: '5px'}} />

            {`${props.preparationTime} minutes`}
          </div>

          <div>
            <FireOutlined style={{marginRight: '5px'}} />

            {`${props.calories} kcal`}
          </div>
        </div>

        <Card.Meta description={props.description} title={props.name} />
      </div>
    </Card>
  );
}

const WrappedComponent = withFirebase(connector(RecipeCard));

export {WrappedComponent as RecipeCard};
