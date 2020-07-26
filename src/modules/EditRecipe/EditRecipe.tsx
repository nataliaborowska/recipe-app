import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Typography} from 'antd';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {EditRecipeForm} from './EditRecipeForm';
import {AppRoutesEnum} from '../../utils/AppRoutesEnum';
import {ErrorModal} from '../../common/ErrorModal';
import {IFirebase} from '../../components/Firebase';
import {SuccessModal} from '../../common/SuccessModal';
import {withFirebase} from '../../components/Firebase';
import {
  deleteRecipe,
  editRecipe,
  editRecipeEnd,
  editRecipeFail,
  fetchRecipeData
} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {withAuthorization} from '../../common/withAuthorization';
import {IRecipeData} from '../../store/reducers/recipeReducer';
import {RecipeLinks} from './RecipeLinks';

import modules from './EditRecipe.module.scss';

export interface IFormField {
  errors?: Array<string>;
  name?: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: string;
}

const mapStateToProps = (state: IStoreState) => {
  return {
    editRecipeSuccess: state.recipe.recipeSuccess,
    recipeData: state.recipe.recipeData,
    recipeError: state.recipe.recipeError,
    recipeIsLoading: state.recipe.recipeIsLoading,
  }
}

const mapDispatchToProps = {deleteRecipe, editRecipe, editRecipeEnd, editRecipeFail, fetchRecipeData};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMatchParams {
  recipeId: string;
}

interface IPropTypes extends PropsFromRedux, RouteComponentProps<IMatchParams> {
  firebase: IFirebase;
}

interface IState {
  isFormValid: boolean;
  isErrorModalVisible: boolean;
}

export class EditRecipeUnwrapped extends React.Component<IPropTypes, IState> {
  private recipeId: string;
  constructor(props: IPropTypes) {
    super(props);

    this.state = {
      isFormValid: false,
      isErrorModalVisible: false,
    }

    const {recipeId} = this.props.match.params;
    this.recipeId = recipeId;
  }

  componentDidMount() {
    this.props.fetchRecipeData(this.recipeId, this.props.firebase);
  }

  handleCloseErrorModal = () => {
    this.props.editRecipeEnd();
  }

  handleCloseSuccessModal = () => {
    this.props.editRecipeEnd();
    this.props.history.push(`${AppRoutesEnum.RECIPES}/${this.recipeId}`);
  }

  handleDeleteClick = () => {
    if (this.recipeId) {
      this.props.deleteRecipe(this.recipeId, this.props.firebase);

      this.props.history.push(`${AppRoutesEnum.RECIPES}`);
    }
  }

  handleFormSubmit = (values: IRecipeData) => {
    this.props.editRecipe(this.recipeId, values, this.props.firebase);
  }

  handleFormSubmitFailed = () => {
    this.props.editRecipeFail('There was a problem creating the recipe');
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
      <div className={modules.editRecipe} data-test="component-edit-recipe">
        <RecipeLinks
          recipeId={this.recipeId}
          onDeleteClick={this.handleDeleteClick}
        />

        <Typography.Title>Edit the recipe</Typography.Title>

        {this.props.recipeData &&
          <EditRecipeForm
            isFormValid={this.state.isFormValid}
            onFormSubmit={this.handleFormSubmit}
            onFormSubmitFailed={this.handleFormSubmitFailed}
            onFormFieldsChange={this.handleFormFieldsChange}
            recipeData={this.props.recipeData}
          />
        }

        {this.props.recipeError &&
          <ErrorModal
            isVisible={this.props.recipeError.length > 0}
            message={this.props.recipeError}
            onCloseModal={this.handleCloseErrorModal}
            modalTitle="Edit recipe fail"
          />
        }

        <SuccessModal
          isVisible={this.props.editRecipeSuccess}
          message='You have successfully edited the recipe'
          onCloseModal={this.handleCloseSuccessModal}
          modalTitle="Recipe edited"
        />
      </div>
    );
  }
}

export const EditRecipeConnected = connector(EditRecipeUnwrapped);

const WrappedComponent = withRouter(withFirebase(withAuthorization(EditRecipeConnected)));

export {WrappedComponent as EditRecipe};