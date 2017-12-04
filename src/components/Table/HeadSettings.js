import React from 'react';
import PropTypes from 'prop-types';
import { stringify as bem } from 'rebem-classname';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';

const block = 'table-head-settings';

export default class HeadSettings extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    show: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.parseSettings(props.data);
  }

  componentWillReceiveProps(props) {
    const { data } = props;

    if (data !== undefined) {
      this.setState(this.parseSettings(data));
    }
  }

  parseSettings(data) {
    const settings = {};

    Object.keys(data).map((key, index) => {
      const column = Object.assign({}, data[key]);

      if (column.hiding) {
        settings[key] = column;
      }

      return key;
    });

    return settings;
  }

  handleChange(id, checked) {
    this.setState({
      [id]: Object.assign({}, this.state[id], { hidden: !checked })
    });
  }

  renderItemSettings = ([id, { hidden, hiding, children, nameGroup }], index) => {
    const label = nameGroup ? `${nameGroup}: ${children}` : children;

    return (
      <div key={index}>
        <Checkbox checked={!hidden} label={label} onChange={this.handleChange.bind(this, id)} />
      </div>
    );
  };

  handleClickSave = event => {
    this.props.onSave(Object.assign({}, this.state));
  };

  handleClickCancel = event => {
    this.props.onCancel();
  };

  getBemMods() {
    return {
      show: !!this.props.show
    };
  }

  render() {
    const settings = Object.entries(this.state);
    const { x, y } = this.props;
    const style = { top: `${y}px`, left: `${x}px` };

    return (
      <div className={bem({ block, mods: this.getBemMods() })} style={style}>
        <div className={bem({ block, elem: 'body' })}>{settings.map(this.renderItemSettings)}</div>
        <div className={bem({ block, elem: 'actions' })}>
          <Button primary onClick={this.handleClickSave}>
            OK
          </Button>
          <Button secondary onClick={this.handleClickCancel}>
            Отменить
          </Button>
        </div>
      </div>
    );
  }
}
