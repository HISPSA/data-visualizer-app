import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import VisualizationTypeIcon from './VisualizationTypeIcon';
import {
    chartTypeDisplayNames,
    isOpenAsType,
    OPEN_AS_GEO_MAP,
} from '../../modules/chartTypes';
import { sGetUiType } from '../../reducers/ui';
import { sGetCurrent } from '../../reducers/current';
import { acSetUiType } from '../../actions/ui';
import { apiSaveAOInUserDataStore } from '../../api/userDataStore';
import styles from './styles/VisualizationTypeSelector.style';
import VisualizationTypeMenuItem from './VisualizationTypeMenuItem';

export const MAPS_APP_URL = 'dhis-web-maps';

export const prepareCurrentAnalyticalObject = current => ({
    ...current,
    id: undefined,
    name: undefined,
    displayName: undefined,
});

export class VisualizationTypeSelector extends Component {
    constructor(props, context) {
        super(props);

        this.state = { anchorEl: null };
        this.baseUrl = context.baseUrl;
        this.chartTypes = this.getChartTypes();
    }

    handleButtonClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = type => event => {
        this.props.onTypeSelect(type);
        this.handleClose();
    };

    handleOpenAsMenuItemClick = type => event => {
        if (type === OPEN_AS_GEO_MAP) {
            this.handleOpenChartAsMapClick();
        }
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleOpenChartAsMapClick = async () => {
        const currentAnalyticalObject = prepareCurrentAnalyticalObject(
            this.props.current
        );

        await apiSaveAOInUserDataStore(currentAnalyticalObject);

        window.location.href = `${
            this.baseUrl
        }/${MAPS_APP_URL}?currentAnalyticalObject=true`;
    };

    getChartTypes = () => {
        return Object.keys(chartTypeDisplayNames).reduce(
            (result, type) => {
                const chartType = isOpenAsType(type)
                    ? 'openAsTypes'
                    : 'nativeTypes';

                result[chartType].push(type);

                return result;
            },
            { nativeTypes: [], openAsTypes: [] }
        );
    };

    render() {
        const { anchorEl } = this.state;
        const { visualizationType } = this.props;
        const { nativeTypes, openAsTypes } = this.chartTypes;

        return (
            <Fragment>
                <Button
                    onClick={this.handleButtonClick}
                    disableRipple
                    disableFocusRipple
                    fullWidth={true}
                    size="small"
                    style={styles.button}
                >
                    <VisualizationTypeIcon type={visualizationType} />
                    {chartTypeDisplayNames[visualizationType]}
                    <ArrowDropDownIcon style={styles.dropDownArrow} />
                </Button>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    MenuListProps={{
                        style: styles.menu,
                    }}
                >
                    {nativeTypes.map(type => (
                        <VisualizationTypeMenuItem
                            key={type}
                            type={type}
                            visualizationType={visualizationType}
                            styles={styles}
                            onClick={this.handleMenuItemClick(type)}
                        />
                    ))}
                    <div style={{ clear: 'both' }} />
                    <hr style={styles.menuDivider} />
                    {openAsTypes.map(type => (
                        <VisualizationTypeMenuItem
                            key={type}
                            type={type}
                            visualizationType={visualizationType}
                            styles={styles}
                            onClick={this.handleOpenAsMenuItemClick(type)}
                            disabled={!this.props.current}
                        />
                    ))}
                </Menu>
            </Fragment>
        );
    }
}

VisualizationTypeSelector.propTypes = {
    visualizationType: PropTypes.oneOf(Object.keys(chartTypeDisplayNames)),
};

VisualizationTypeSelector.contextTypes = {
    baseUrl: PropTypes.string,
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    current: sGetCurrent(state),
});

const mapDispatchToProps = dispatch => ({
    onTypeSelect: type => dispatch(acSetUiType(type)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualizationTypeSelector);
