import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import PositiveNumberBaseType from './PositiveNumberBaseType'
import { OPTION_AXIS_DECIMALS } from '../../../modules/options'

const AxisDecimals = ({ disabled, axisId }) => (
    <PositiveNumberBaseType
        width="96px"
        label={i18n.t('Decimals')}
        disabled={disabled}
        placeholder={i18n.t('Auto')}
        option={{
            id: OPTION_AXIS_DECIMALS,
            axisId,
        }}
    />
)

AxisDecimals.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisDecimals
