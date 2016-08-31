import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router'

const propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

function BreadcrumbItem({ icon, title, url }) {
  return (
    <li className={classNames({ active: !url })}>
      {url
        ? <Link to={url}>{icon ? <i className={icon} /> : ''} {title}</Link>
        : title
      }
    </li>
  );
}

BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
