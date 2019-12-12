import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const ShowDimensionLabels = () => (
    <CheckboxBaseOption
        label={i18n.t('Dimension labels')}
        option={{
            name: 'showDimensionTotals',
        }}
    />
)

export default ShowDimensionLabels
