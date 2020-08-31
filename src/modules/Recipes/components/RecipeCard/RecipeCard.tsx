import React from 'react';
import {Button, Card} from 'antd';
import {ClockCircleOutlined, DeleteOutlined, EditOutlined, FireOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {AppRoutesEnum} from '../../../../utils/AppRoutesEnum';
import {IFirebase, withFirebase} from '../../../../components/Firebase';
import {IRecipeData} from '../../../../store/reducers/recipeReducer';

import styles from './RecipeCard.module.scss';


interface IPropTypes extends IRecipeData {
  firebase: IFirebase;
  handleDeleteRecipe: (recipeId: string, firebase: IFirebase) => void;
}

export const RecipeCardUnwrapped: React.FC<IPropTypes> = (props) => {
  const onDeleteClick = () => {
    if (props.recipeId) {
      props.handleDeleteRecipe(props.recipeId, props.firebase);
    }
  }

  return (
    <Card
      bodyStyle={{padding: '0'}}
      className={styles.recipeCard}
      data-test="component-recipe-card"
      cover={<img alt="example" src="https://www.stevensegallery.com/640/360" />}
      hoverable
    >
      <div className={styles.recipeActions}>
        <Link
          className={styles.recipeAction}
          to={`${AppRoutesEnum.RECIPE}/${props.recipeId}`}
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
          data-test="delete-button"
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

const WrappedComponent = withFirebase(RecipeCardUnwrapped);

export {WrappedComponent as RecipeCard};
