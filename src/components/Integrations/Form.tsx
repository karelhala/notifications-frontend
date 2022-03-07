import { FormSelectOption } from '@patternfly/react-core';
import { Form, FormSelect, FormTextInput, OuiaComponentProps, ouiaIdConcat } from '@redhat-cloud-services/insights-common-typescript';
import { useFormikContext } from 'formik';
import * as React from 'react';

import Config from '../../config/Config';
import { maxIntegrationNameLength } from '../../schemas/Integrations/Integration';
import { isStable } from '../../types/Environments';
import { NewUserIntegration } from '../../types/Integration';
import { getOuiaProps } from '../../utils/getOuiaProps';
import { IntegrationTypeForm } from './Form/IntegrationTypeForm';

export const IntegrationsForm: React.FunctionComponent<OuiaComponentProps> = (props) => {

    const { values } = useFormikContext<NewUserIntegration>();
    const stable = isStable();

    const options = React.useMemo(() => {
        const options = stable ?
            Config.integrations.actions.stable :
            Config.integrations.actions.beta;

        return options
        .map(type => (<FormSelectOption key={ type } label={ Config.integrations.types[type].name } value={ type } />));
    }, [ stable ]);

    return (
        <Form { ...getOuiaProps('Integrations/Form', props) }>
            <FormTextInput
                maxLength={ maxIntegrationNameLength }
                isRequired={ true }
                label="Integration name"
                type="text"
                name="name"
                id="name"
                ouiaId={ ouiaIdConcat(props.ouiaId, 'name') }
            />
            <FormSelect
                isRequired={ true }
                label="Type"
                name="type"
                id="integration-type"
                ouiaId={ ouiaIdConcat(props.ouiaId, 'type') }
            >
                { options }
            </FormSelect>
            <IntegrationTypeForm
                type={ values.type }
                ouiaId={ ouiaIdConcat(props.ouiaId, 'type-form') }
            />
        </Form>
    );
};
