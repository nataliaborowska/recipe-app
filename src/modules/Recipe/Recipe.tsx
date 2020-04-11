import React from 'react';
import {useParams} from 'react-router-dom';
import {Col, Divider, Rate, Row, Statistic, Typography} from 'antd';

import styles from './Recipe.module.scss';

export const Recipe: React.FC = () => {
  const {recipeId} = useParams();
  const recipe = {
    description: 'Mauris quis tempor metus. Sed in magna purus. Suspendisse non nibh nec arcu semper venenatis eget sed erat. Fusce vitae rutrum arcu. Integer sed ipsum in diam scelerisque ultrices. Sed mollis consectetur tellus id consequat. Fusce scelerisque massa vel turpis sollicitudin, a ullamcorper urna tempor. Maecenas sit amet commodo ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam fringilla lacus vel lectus consequat, et tincidunt est rutrum. Donec non mi leo.',
    id: '1',
    title: 'This is a test recipe',
    image: 'https://www.stevensegallery.com/640/360',
    ingredients: ['ing1', 'ing2', 'ing3'],
    instructions: 'some instructions',
    servings: 2,
    preparationTime: '30 min',
    rating: 3,
    calories: 800,
    tags: ['Italian', 'Baking'],
    directions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Etiam sit amet felis in risus facilisis rutrum.',
      'Quisque malesuada, est ac tincidunt malesuada, turpis mauris lacinia augue, ac fermentum odio odio ut risus.',
      'Cras a augue eu metus placerat eleifend ultrices malesuada nisl.',
      'Nullam at dignissim sapien.',
      'Vestibulum ut posuere libero.',
      'Donec at mollis sem, a tristique metus.Nullam id condimentum nunc, sit amet bibendum nisl.',
      'Integer nec orci tellus.',
    ]
  };

  return (
    <div className={styles.recipeWrapper}>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Title>{recipe.title}</Typography.Title>

          <span className={styles.recipeRating}>
            <Rate value={recipe.rating} />

            ({recipe.rating})
          </span>

          <Typography.Paragraph ellipsis={{rows: 4, expandable: true}}>
            {recipe.description}
          </Typography.Paragraph>

          <Row className={styles.recipeStats} gutter={8}>
            <Col span={8} className={styles.recipeData}>
              <Statistic
                title="ingredients"
                value={recipe.ingredients.length}
              />
            </Col>

            <Col span={8} className={styles.recipeData}>
              <Statistic
                title="prep time"
                value={recipe.preparationTime}
              />
            </Col>

            <Col span={8} className={styles.recipeData}>
              <Statistic
                title="Calories"
                value={recipe.calories}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <img
            alt={recipe.title}
            className={styles.recipeImage}
            src={recipe.image}
          />
        </Col>
      </Row>

      <Divider />

      <Typography.Title level={2}>Ingredients ({recipe.servings} servings)</Typography.Title>

      <ul className={styles.ingredientsList}>
        {recipe.ingredients.map(ingredient => (
          <li className={styles.ingredientsListItem}>{ingredient}</li>
        ))}
      </ul>

      <Typography.Title level={2}>Directions</Typography.Title>

      <ol className={styles.directionsList}>
        {recipe.directions.map(direction => (
          <li className={styles.directionsListItem}>{direction}</li>
        ))}
      </ol>
    </div>
  );
}
