import _, { isEqual, pick } from 'lodash';
import { Button, Icon } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';

import { selectAllBrandsAction } from '../../../../actions';
import { getBrands } from '../../../../selectors';

class SelectAllButton extends React.Component {

    shouldComponentUpdate(nextProps) {
        const before = pick(this.props, 'brands');
        const after = pick(nextProps, 'brands');
        return !isEqual(before, after);
    }

    render() {
        return (
            <Button transparent onPress={() => { this.props.selectAll(this.props.brands) }}>
                <Icon name='select-all' type="MaterialCommunityIcons" />
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        brands: _(getBrands(state)).map('name').value(),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectAll: (brands) => {
            dispatch(selectAllBrandsAction(brands));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllButton);