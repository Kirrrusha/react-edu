import React from 'react';

export default (OriginalComponent) => class accordion extends React.Component {
    state = {
        openItemId: null
    }

    render() {
        return (
            <OriginalComponent
                {...this.props}
                {...this.state}
                toggleOpenItem={this.toggleOpenItem}
            />
        );
    }

    toggleOpenItem = openItemId => ev => {
        this.setState({
            openItemId: openItemId === this.state.openItemId ? null : openItemId
        });
    }
}

