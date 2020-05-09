import React from 'react';
import {Card} from 'antd';
import {ClockCircleOutlined, EditOutlined, FireOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {IRecipeData} from '../../../store/reducers/recipeReducer';
import {AppRoutesEnum} from '../../../utils/AppRoutesEnum';

import styles from './RecipeCard.module.scss';

export const RecipeCard: React.FC<IRecipeData> = (props) => (
  <Card
    className={styles.recipeCard}
    cover={<img alt="example" src="https://www.stevensegallery.com/640/360" />}
    hoverable
  >
    <div className={styles.cardContent}>
      <div className={styles.recipeActions}>
        <Link to={`${AppRoutesEnum.RECIPE}/${props.recipeId}`}><EyeOutlined /></Link>
        <Link to={`${AppRoutesEnum.EDIT_RECIPE}/${props.recipeId}`}><EditOutlined /></Link>
      </div>
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
