import React from 'react';
import {Breadcrumb} from 'antd';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';

import {AppRoutesEnum} from '../../utils/AppRoutesEnum';

interface IMatchParams {
  recipeId: string;
  userId: string;
}

interface IPropTypes extends RouteComponentProps<IMatchParams> {}

class BreadCrumbWrapper extends React.Component<IPropTypes> {
  urlPathElements = this.props.location.pathname.split('/').filter(i => i);

  urlPathNames = this.urlPathElements.reduce((pathPrevious: Array<string>, pathCurrent: string) => {
    const pathPreviousLastIndex = pathPrevious.length - 1;

    if (pathPrevious.indexOf('edit-recipe') !== -1 || pathPrevious.indexOf('recipe') !== -1 || pathPrevious.indexOf('account') !== -1) {
      pathPrevious[pathPreviousLastIndex] = `${pathPrevious[pathPreviousLastIndex]}/${pathCurrent}`;
    } else {
      pathPrevious.push(pathCurrent);
    }

    return pathPrevious;
  }, []);

  urlPathLinks = this.urlPathNames.reduce((pathPrevious: Array<string>, pathCurrent: string) => {
    pathPrevious.push(`${pathPrevious}/${pathCurrent}`);

    return pathPrevious
  }, []);

  urlPaths = this.urlPathNames.map((pathName: string, index: number) => {
    return {
      name: pathName.split('/').join(' / '),
      link: this.urlPathLinks[index],
    }
  });

  render() {
    return (
      <Breadcrumb style={{paddingBottom: 20}}>
        <Breadcrumb.Item key='home'>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>

        {this.urlPaths.map((urlPath: any) => (
          <Breadcrumb.Item key={urlPath.name}>
            <Link to={urlPath.link}>{urlPath.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

const WrappedComponent = withRouter(BreadCrumbWrapper);

export {WrappedComponent as BreadCrumbWrapper};