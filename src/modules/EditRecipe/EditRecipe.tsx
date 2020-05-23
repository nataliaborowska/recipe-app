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
import {editRecipe, editRecipeEnd, editRecipeFail, fetchRecipeData} from '../../store/actions/recipeActions/recipe';
import {IStoreState} from '../../store/store';
import {withAuthorization} from '../../common/withAuthorization';
import {IRecipeData} from '../../store/reducers/recipeReducer';

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

const mapDispatchToProps = {editRecipe, editRecipeEnd, editRecipeFail, fetchRecipeData};

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

class EditRecipe extends React.Component<IPropTypes, IState> {
  state = {
    isFormValid: false,
    isErrorModalVisible: false,
  }

  componentDidMount() {
    const {recipeId} = this.props.match.params;

    this.props.fetchRecipeData(recipeId, this.props.firebase);
  }

  handleCloseErrorModal = () => {
    this.props.editRecipeEnd();
  }

  handleCloseSuccessModal = () => {
    this.props.editRecipeEnd();
    this.props.history.push(`${AppRoutesEnum.RECIPES}/${this.props.match.params.recipeId}`);
  }

  handleFormSubmit = (values: IRecipeData) => {
    this.props.editRecipe(this.props.match.params.recipeId, values, this.props.firebase);
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
      <div className={modules.editRecipe}>
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

const WrappedComponent = connector(withRouter(withFirebase(withAuthorization(EditRecipe))));

export {WrappedComponent as EditRecipe};