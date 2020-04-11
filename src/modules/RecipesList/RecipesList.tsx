import React from 'react';
import {Col, Row, Typography} from 'antd';

import {RecipeCard} from './RecipeCard';

import styles from './RecipesList.module.scss';

export const RecipesList: React.FC = () => {
  const recipes = [
    {
      description: 'This is a description',
      id: '1',
      title: 'This is a test recipe',
      image: './src-to-image',
      ingredients: ['ing1', 'ing2', 'ing3'],
      instructions: 'some instructions',
      servings: 2,
      preparationTime: '30 min',
    },
    {
      description: 'This is a description2',
      id: '1',
      title: 'This is a test recipe2',
      image: './src-to-image',
      ingredients: ['ing1', 'ing2', 'ing3'],
      instructions: 'some instructions',
      servings: 2,
      preparationTime: '30 min',
    },
    {
      description: 'This is a description2',
      id: '1',
      title: 'This is a test recipe2',
      image: './src-to-image',
      ingredients: ['ing1', 'ing2', 'ing3'],
      instructions: 'some instructions',
      servings: 2,
      preparationTime: '30 min',
    },
    {
      description: 'This is a description2',
      id: '1',
      title: 'This is a test recipe2',
      image: './src-to-image',
      ingredients: ['ing1', 'ing2', 'ing3'],
      instructions: 'some instructions',
      servings: 2,
      preparationTime: '30 min',
    },
    {
      description: 'This is a description2',
      id: '1',
      title: 'This is a test recipe2',
      image: './src-to-image',
      ingredients: ['ing1', 'ing2', 'ing3'],
      instructions: 'some instructions',
      servings: 2,
      preparationTime: '30 min',
    },
  ];

  return (
    <div className={styles.recipesList}>
      <Typography.Title>Recipes List</Typography.Title>

      <Row gutter={16}>
        {recipes.map(recipe => (
          <Col span={6}>
            <RecipeCard {...recipe} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
