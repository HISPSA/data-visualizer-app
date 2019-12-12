import React from 'react'

import i18n from '@dhis2/d2-i18n'

import CheckboxBaseOption from './CheckboxBaseOption'

const ColTotals = () => (
    <CheckboxBaseOption
        label={i18n.t('Columns totals')}
        option={{
            name: 'colTotals',
        }}
    />
)

export default ColTotals
