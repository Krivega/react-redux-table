import React from 'react';
import PropTypes from 'prop-types';
import Tbody from './Tbody';
import Thead from './Thead';
import HeadSettings from './HeadSettings';
import Tr from './Tr';
import Td from './Td';

import './style.css';

export default class Table extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    sm: PropTypes.bool,
    rowClassName: PropTypes.func,
    cellClassName: PropTypes.func,
    onChangeHeadSetting: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = { headProps: this.getHeadProps(props) };
  }

  componentWillReceiveProps(props) {
    this.setState({ headProps: this.getHeadProps(props) });
  }

  getHeadProps({ children }) {
    const headProps = {};

    React.Children.forEach(children, column => {
      const { id } = column.props;

      if (id) {
        headProps[id] = column.props;
      }
    });

    return this.parseHeadProps(headProps, headProps);
  }

  parseHeadProps(initialSettings, settings) {
    const headProps = {};

    Object.keys(initialSettings).map((key, index) => {
      const column = Object.assign({}, initialSettings[key]);

      if (column.childrenIds) {
        column.hidden = column.childrenIds.reduce((a, b) => {
          return a && settings[b].hidden === true;
        }, true);
      } else if (settings[key]) {
        column.hidden = settings[key].hidden === true;
      }

      headProps[key] = column;

      return key;
    });

    return headProps;
  }

  getCellProps(id) {
    const headProps = this.state.headProps[id];

    const defaultCellProps = {
      hidden: !headProps
    };

    return Object.assign(defaultCellProps, headProps);
  }

  renderCell = (row, column, index) => {
    const { cellClassName } = this.props;
    const { id } = column.props;
    const cell = row[id];
    const { hidden } = this.getCellProps(id);
    let className;

    if (hidden || cell === undefined) {
      return null;
    }

    if (cellClassName) {
      className = cellClassName(cell, id);
    }

    if (typeof cell === 'function') {
      return (
        <Td className={className} key={id}>
          {cell()}
        </Td>
      );
    }

    return <Td className={className} key={id}>{`${cell}`}</Td>;
  };

  renderRow = (row = {}, index) => {
    const { children, rowClassName } = this.props;
    let className;

    if (Object.entries(row).length === 0) {
      return null;
    }

    if (rowClassName) {
      className = rowClassName(row);
    }

    return (
      <Tr className={className} key={index}>
        {React.Children.map(children, this.renderCell.bind(this, row))}
      </Tr>
    );
  };

  renderHeadCell = (column, index) => {
    const { id } = column.props;

    if (this.state.headProps[id].hidden) {
      return null;
    }

    return column;
  };

  renderHeadRow = (row = [], index) => {
    if (row.length === 0) {
      return null;
    }

    return <Tr key={index}>{row.map(this.renderHeadCell)}</Tr>;
  };

  handleClickHead = ({ clientX, clientY }) => {
    const { x: headX, y: headY } = this.elHead.getBoundingClientRect();

    this.setState({
      headSettingsX: clientX - headX,
      headSettingsY: clientY - headY,
      headSettingsShow: true
    });
  };

  renderHeadSettings() {
    const { headProps: settings, headSettingsX, headSettingsY, headSettingsShow } = this.state;

    return (
      <HeadSettings
        show={headSettingsShow}
        x={headSettingsX}
        y={headSettingsY}
        data={settings}
        onSave={settings => {
          this.props.onChangeHeadSetting(settings);

          const headProps = this.parseHeadProps(Object.assign({}, this.state.headProps), settings);

          this.setState({
            headProps,
            headSettingsShow: false
          });
        }}
        onCancel={() => {
          this.setState({
            headSettingsShow: false
          });
        }}
      />
    );
  }

  setRefElHead = el => {
    this.elHead = el;
  };

  renderHead() {
    const { children } = this.props;
    const rows = [];

    if (!children) {
      return null;
    }

    React.Children.forEach(children, column => {
      const { row = 0 } = column.props;

      rows[row] = rows[row] || [];
      rows[row].push(column);

      return column;
    });

    return (
      <Thead theadRef={this.setRefElHead} onClick={this.handleClickHead}>
        {rows.map(this.renderHeadRow)}
      </Thead>
    );
  }

  renderBody() {
    const { rows } = this.props;

    if (rows.length === 0) {
      return null;
    }

    return <Tbody>{rows.map(this.renderRow)}</Tbody>;
  }

  getClassName() {
    const { striped, bordered, sm } = this.props;
    const classNames = ['table'];

    if (striped) {
      classNames.push('table-striped');
    }

    if (bordered) {
      classNames.push('table-bordered');
    }

    if (sm) {
      classNames.push('table-sm');
    }

    return classNames.join(' ');
  }

  render() {
    return (
      <div className="table-wrapper">
        <table className={this.getClassName()}>
          {this.renderHead()}
          {this.renderBody()}
        </table>
        {this.renderHeadSettings()}
      </div>
    );
  }
}
