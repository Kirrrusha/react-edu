import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import {connect} from 'react-redux';
import 'react-day-picker/lib/style.css';
import {changeDateRange} from '../../ac';
import PropTypes from 'prop-types';
import {dateRangeSelector} from "../../selectors";

class DateRange extends Component {

    static propTypes = {
        range: PropTypes.object,
        changeDateRange: PropTypes.func
    };

    handleDayClick = (day) => {
        const { changeDateRange, range } = this.props;
        changeDateRange(DateUtils.addDayToRange(day, range))
    }

    render() {
        const { from, to } = this.props.range;
        const selectedRange =
            from && to && `${from.toDateString()} - ${to.toDateString()}`;
        return (
            <div className="date-range">
                <DayPicker
                    selectedDays={(day) => DateUtils.isDayInRange(day, { from, to })}
                    onDayClick={this.handleDayClick}
                />
                {selectedRange}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return ({
            range: dateRangeSelector(state)
        })
    },
    { changeDateRange }
)(DateRange);