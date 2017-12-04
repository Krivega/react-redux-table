import { connect } from 'react-redux';
import { setHeadSettings } from 'containers/HeadSettings/actions';
import { toJS } from 'containers/toJS';
import Container from './Container';
import selector from './selectors';

const mapStateToProps = state => selector(state);

const mapDispatchToProps = dispatch => {
  return {
    onChangeHeadSetting: settings => {
      dispatch(setHeadSettings(settings));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Container));
