import React from 'react';
import {Select} from 'antd';
import {v4 as uuidv4} from 'uuid';

import styles from './RecipeFilters.module.scss';

interface IPropTypes {
  recipeNamesList: Array<string>;
  ingredientsList: Array<string>;
  cuisineNamesList: Array<string>;
  onNameSearch: (value: Array<string>) => void;
  onCuisineSearch: (value: Array<string>) => void;
  onIngredientsSearch: (value: Array<string>) => void;
}

export const RecipeFilters: React.FC<IPropTypes> = (props) => (
  <div
    className={styles.recipeFilters}
    data-test="component-recipe-filters"
  >
    <Select
      data-test="name-search"
      mode="multiple"
      showSearch
      style={{width: 200, paddingRight: 10}}
      placeholder="Select a recipe"
      optionFilterProp="children"
      onChange={props.onNameSearch}
    >
      {props.recipeNamesList.map((recipeName: string) => (
        <Select.Option
          key={uuidv4()}
          value={recipeName}
        >
          {recipeName}
        </Select.Option>
      ))}

    </Select>

    <Select
      data-test="cuisine-search"
      showSearch
      style={{width: 200, paddingRight: 10}}
      placeholder="Select a cuisine"
      mode="multiple"
      optionFilterProp="children"
      onChange={props.onCuisineSearch}
    >
      {props.cuisineNamesList.map(cuisine => (
        <Select.Option
          key={uuidv4()}
          value={cuisine}
        >
          {cuisine}
        </Select.Option>
      ))}
    </Select>

    <Select
      data-test="ingredients-search"
      showSearch
      style={{width: 200, paddingRight: 10}}
      placeholder="Select ingredients"
      mode="multiple"
      optionFilterProp="children"
      onChange={props.onIngredientsSearch}
    >
      {props.ingredientsList.map((ingredient: string) => (
        <Select.Option
          key={uuidv4()}
          value={ingredient}
        >
          {ingredient}
        </Select.Option>
      ))}
    </Select>
  </div>
);
