import React from 'react';
import {Button} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {AppRoutesEnum} from '../../../utils/AppRoutesEnum';

import styles from './RecipeLinks.module.scss';

interface IPropTypes {
  onDeleteClick: () => void;
  recipeId: string;
}

export const RecipeLinks: React.SFC<IPropTypes> = (props) => (
  <div className={styles.recipeLinks} data-test="component-recipe-links">
    <Link
      className={styles.recipeLiksAction}
      to={`${AppRoutesEnum.EDIT_RECIPE}/${props.recipeId}`}
    >
      <EditOutlined />
    </Link>

    <Button
      className={styles.recipeLinksAction}
      data-test="recipe-links-button"
      onClick={props.onDeleteClick}
      style={{padding: 0}}
      type="link"
    >
      <DeleteOutlined />
    </Button>
  </div>
);
