import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
const ViewPsychologistProfile = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPsychologistProfile.url(args, options),
    method: 'get',
})

ViewPsychologistProfile.definition = {
    methods: ["get","head"],
    url: '/admin/psychologist-profiles/{record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
ViewPsychologistProfile.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return ViewPsychologistProfile.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
ViewPsychologistProfile.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
ViewPsychologistProfile.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewPsychologistProfile.url(args, options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
const ViewPsychologistProfileForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ViewPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
ViewPsychologistProfileForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ViewPsychologistProfile.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ViewPsychologistProfile.php:7
* @route '/admin/psychologist-profiles/{record}'
*/
ViewPsychologistProfileForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ViewPsychologistProfile.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ViewPsychologistProfile.form = ViewPsychologistProfileForm

export default ViewPsychologistProfile