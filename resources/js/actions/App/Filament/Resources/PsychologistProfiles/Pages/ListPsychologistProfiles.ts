import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
const ListPsychologistProfiles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPsychologistProfiles.url(options),
    method: 'get',
})

ListPsychologistProfiles.definition = {
    methods: ["get","head"],
    url: '/admin/psychologist-profiles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
ListPsychologistProfiles.url = (options?: RouteQueryOptions) => {
    return ListPsychologistProfiles.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
ListPsychologistProfiles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPsychologistProfiles.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
ListPsychologistProfiles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPsychologistProfiles.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
const ListPsychologistProfilesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListPsychologistProfiles.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
ListPsychologistProfilesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListPsychologistProfiles.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/ListPsychologistProfiles.php:7
* @route '/admin/psychologist-profiles'
*/
ListPsychologistProfilesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ListPsychologistProfiles.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ListPsychologistProfiles.form = ListPsychologistProfilesForm

export default ListPsychologistProfiles