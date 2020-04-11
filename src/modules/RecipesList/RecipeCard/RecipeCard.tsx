import React from 'react';
import {Card} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import styles from './RecipeCard.module.scss';

interface IPropTypes {
  description: string;
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  servings: number;
  preparationTime: string;
}

export const RecipeCard: React.FC<IPropTypes> = (props) => (
  <Link to={`/recipe/${props.id}`}>
    <Card
      className={styles.recipeCard}
      cover={<img alt="example" src="https://www.stevensegallery.com/640/360" />}
      hoverable
    >
      <div className={styles.cardContent}>
        <div className={styles.preparationTime}>
          <ClockCircleOutlined style={{marginRight: '5px'}} />

          {`${props.preparationTime} minutes`}
        </div>
        <Card.Meta description={props.description} title={props.title} />
      </div>
    </Card>
  </Link>
);
