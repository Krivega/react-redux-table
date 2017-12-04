import React from 'react';
import flat, { unflatten } from 'flat';
import Table from 'components/Table';
import Checkbox from 'components/Checkbox';
import Image from 'components/Image';
import TableHeadColumn from 'components/Table/HeadColumn';
import playImage from './play.png';
import stopImage from './stop.png';
import pauseImage from './pause.png';

const stateImageMap = {
  new: playImage,
  ready: pauseImage,
  stopped: stopImage
};

export default class Content extends React.PureComponent {
  getIdGoalItemTableHead(indexGroup, name) {
    return `goals.${indexGroup}.${name}`;
  }

  renderGoalItemTableHead(indexGroup, nameGroup, idGroup, name, index) {
    const id = this.getIdGoalItemTableHead(indexGroup, name);

    idGroup = `goal-${idGroup}`;

    return (
      <TableHeadColumn
        row="1"
        id={id}
        key={id}
        nameGroup={nameGroup}
        idGroup={idGroup}
        hiding
        hidden={this.getHiddenSetting(`${idGroup}.${name}`)}
      >
        {name}
      </TableHeadColumn>
    );
  }

  renderGoalsTableHead = ({ name, goal_id: id }, index) => {
    let goalItemHeads = ['count', 'cpa', 'cr'];
    const goalItemHeadsIds = goalItemHeads.map(name => this.getIdGoalItemTableHead(index, name));

    const goalHeads = [
      <TableHeadColumn row="0" colSpan="3" id={id} key={index} childrenIds={goalItemHeadsIds}>
        {name}
      </TableHeadColumn>
    ];

    goalItemHeads = goalItemHeads.map(this.renderGoalItemTableHead.bind(this, index, name, id));

    return goalHeads.concat(goalItemHeads);
  };

  parseItemTable = item => {
    const prependCells = {
      active: () => {
        return <Checkbox checked={item.is_active} />;
      },
      status: () => {
        const src = stateImageMap[item.state];

        if (!src) {
          return null;
        }

        return <Image src={src} />;
      },
      value: item.value
    };

    return {
      ...prependCells,
      ...flat({ costs: item.costs, goals: item.goals })
    };
  };

  handleChangeHeadSetting = settings => {
    const storeSettings = {};

    Object.keys(settings).map(function(key, index) {
      const column = Object.assign({}, settings[key]);
      const { idGroup } = column;

      if (idGroup) {
        storeSettings[idGroup] = storeSettings[idGroup] || {};
        key = key
          .split('.')
          .slice(2)
          .join('.');
        storeSettings[idGroup][key] = !column.hidden;
      } else {
        storeSettings[key] = !column.hidden;
      }

      return key;
    });

    this.props.onChangeHeadSetting(unflatten(storeSettings));
  };

  getHiddenSetting(id) {
    let { headSettings } = this.props;

    headSettings = flat(headSettings);

    return headSettings[id] === undefined ? false : !headSettings[id];
  }

  rowClassNameFormat(row) {
    if (row.value === 'Total') {
      return 'table-active';
    }
  }

  cellClassNameFormat(cell, id) {
    if (id === 'value') {
      return 'text-left';
    }
  }

  render() {
    const { content, goalsList, total } = this.props;
    const totalRow = this.parseItemTable(total);
    totalRow.value = 'Total';
    const rows = [totalRow].concat(content.map(this.parseItemTable));

    return (
      <Table
        bordered
        striped
        sm
        rows={rows}
        rowClassName={this.rowClassNameFormat}
        cellClassName={this.cellClassNameFormat}
        onChangeHeadSetting={this.handleChangeHeadSetting}
      >
        <TableHeadColumn row="0" rowSpan="2" id="active" width="22" />
        <TableHeadColumn
          row="0"
          rowSpan="2"
          width="150"
          id="value"
          hiding
          hidden={this.getHiddenSetting('value')}
        >
          КАМПАНИИ
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          width="60"
          id="status"
          hiding
          hidden={this.getHiddenSetting('status')}
        >
          Статус
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          id="costs.clicks"
          hiding
          hidden={this.getHiddenSetting('costs.clicks')}
        >
          Клики
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          id="costs.shows"
          hiding
          hidden={this.getHiddenSetting('costs.shows')}
        >
          Показы
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          id="costs.ctr"
          hiding
          hidden={this.getHiddenSetting('costs.ctr')}
        >
          CTR
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          id="costs.cpc"
          hiding
          hidden={this.getHiddenSetting('costs.cpc')}
        >
          CPC
        </TableHeadColumn>
        <TableHeadColumn
          row="0"
          rowSpan="2"
          id="costs.cost"
          hiding
          hidden={this.getHiddenSetting('costs.cost')}
        >
          Затраты
        </TableHeadColumn>
        {goalsList.map(this.renderGoalsTableHead)}
      </Table>
    );
  }
}
