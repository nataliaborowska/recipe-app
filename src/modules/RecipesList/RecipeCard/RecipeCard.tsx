import React from 'react';
import {Card} from 'antd';
import {ClockCircleOutlined, FireOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {IRecipeData} from '../../../store/reducers/recipeReducer';

import styles from './RecipeCard.module.scss';

export const RecipeCard: React.FC<IRecipeData> = (props) => (
  <Link to={`/recipes/${props.recipeId}`}>
    <Card
      className={styles.recipeCard}
      cover={<img alt="example" src="https://www.stevensegallery.com/640/360" />}
      hoverable
    >
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
  </Link>
);
