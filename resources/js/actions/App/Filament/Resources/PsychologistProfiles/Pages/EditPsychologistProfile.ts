import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
const EditPsychologistProfile = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPsychologistProfile.url(args, options),
    method: 'get',
})

EditPsychologistProfile.definition = {
    methods: ["get","head"],
    url: '/admin/psychologist-profiles/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
EditPsychologistProfile.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return EditPsychologistProfile.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
EditPsychologistProfile.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
EditPsychologistProfile.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditPsychologistProfile.url(args, options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
const EditPsychologistProfileForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
EditPsychologistProfileForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/EditPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}/edit'
*/
EditPsychologistProfileForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditPsychologistProfile.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

EditPsychologistProfile.form = EditPsychologistProfileForm

export default EditPsychologistProfile