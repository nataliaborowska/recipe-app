import React from 'react';
import {Button} from 'antd';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import {AppRoutesEnum} from '../../../utils/AppRoutesEnum';

import styles from './RecipeLinks.module.scss';

interface IPropTypes {
  onDeleteClick: () => void;
  recipeId: string;
}

export const RecipeLinks: React.SFC<IPropTypes> = (props) => (
  <div className={styles.recipeLinks}>
    <Link
      className={styles.recipeLiksAction}
      to={`${AppRoutesEnum.RECIPE}/${props.recipeId}`}
    >
      <EyeOutlined />
    </Link>

    <Button
      className={styles.recipeLinksAction}
      onClick={props.onDeleteClick}
      style={{padding: 0}}
      type="link"
    >
      <DeleteOutlined />
    </Button>
  </div>
);
