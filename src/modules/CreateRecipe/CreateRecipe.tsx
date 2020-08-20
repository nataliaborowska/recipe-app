import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Typography} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {CreateRecipeForm} from './CreateRecipeForm';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase} from '../../components/Firebase';
import {SuccessModal} from '../../common/SuccessModal';
import {withFirebase} from '../../components/Firebase';
import {createRecipe, createRecipeEnd, createRecipeFail} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {withAuthorization} from '../../common/withAuthorization';
import {IRecipeData} from '../../store/reducers/recipeReducer';

import modules from './CreateRecipe.module.scss';

export interface IFormField {
  errors?: Array<string>;
  name?: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: string;
}

const mapStateToProps = (state: IStoreState) => {
  return {
    createRecipeSuccess: state.recipe.recipeSuccess,
    recipeId: state.recipe.recipeId,
    recipeError: state.recipe.recipeError,
    recipeIsLoading: state.recipe.recipeIsLoading,
  }
}

const mapDispatchToProps = {createRecipe, createRecipeEnd, createRecipeFail};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IPropTypes extends PropsFromRedux, RouteComponentProps {
  firebase: IFirebase;
}

interface IState {
  isFormValid: boolean;
  isErrorModalVisible: boolean;
}

export class CreateRecipeUnwrapped extends React.Component<IPropTypes, IState> {
  state = {
    isFormValid: false,
    isErrorModalVisible: false,
  }

  handleCloseErrorModal = () => {
    this.props.createRecipeEnd();
  }

  handleCloseSuccessModal = () => {
    this.props.createRecipeEnd();

    if (this.props.recipeId) {
      this.props.history.push(`${AppRoutesEnum.RECIPES}/${this.props.recipeId}`);
    }
  }

  handleFormSubmit = (values: IRecipeData) => {
    this.props.createRecipe(values, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.createRecipeFail('There was a problem creating the recipe');
  }

  handleFormFieldsChange = (changedFields: Array<IFormField>, allFields: Array<IFormField>) => {
    const formInvalidFields = allFields.filter((field: IFormField) => {
      if (!field.value || (field.errors && field.errors.length > 0)) {
        return field;
      }
    });

    if (formInvalidFields.length === 0) {
      this.setState({isFormValid: true});
    } else {
      this.setState({isFormValid: false});
    }
  }

  render() {
    return (
      <div
        className={modules.createRecipe}
        data-test="component-create-recipe"
      >
        <Typography.Title>Create a new recipe</Typography.Title>

        <CreateRecipeForm
          isFormValid={this.state.isFormValid}
          onFormSubmit={this.handleFormSubmit}
          onFormSubmitFailed={this.handleFormSubmitFailed}
          onFormFieldsChange={this.handleFormFieldsChange}
        />

        {this.props.recipeError &&
          <ErrorModal
            isVisible={this.props.recipeError.length > 0}
            message={this.props.recipeError}
            onCloseModal={this.handleCloseErrorModal}
            modalTitle="Create recipe fail"
          />
        }

        <SuccessModal
          isVisible={this.props.createRecipeSuccess}
          message='You have successfully created a new recipe'
          onCloseModal={this.handleCloseSuccessModal}
          modalTitle="Recipe created"
        />
      </div>
    );
  }
}

export const CreateRecipeConnected = connector(CreateRecipeUnwrapped);

const WrappedComponent = withRouter(withFirebase(withAuthorization(CreateRecipeConnected)));

export {WrappedComponent as CreateRecipe};