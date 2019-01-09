import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectFilter from './select';
import DateRange from './date-picker';

class Filter extends Component {

  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <SelectFilter articles={this.props.articles}/>
        <DateRange/>
      </div>
    );
  }
}

export default Filter;
