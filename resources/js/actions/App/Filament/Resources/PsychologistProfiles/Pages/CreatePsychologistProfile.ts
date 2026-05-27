import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
const CreatePsychologistProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePsychologistProfile.url(options),
    method: 'get',
})

CreatePsychologistProfile.definition = {
    methods: ["get","head"],
    url: '/admin/psychologist-profiles/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
CreatePsychologistProfile.url = (options?: RouteQueryOptions) => {
    return CreatePsychologistProfile.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
CreatePsychologistProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePsychologistProfile.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
CreatePsychologistProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePsychologistProfile.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
const CreatePsychologistProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreatePsychologistProfile.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
CreatePsychologistProfileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreatePsychologistProfile.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile::__invoke
* @see app/Filament/Resources/PsychologistProfiles/Pages/CreatePsychologistProfile.php:7
* @route '/admin/psychologist-profiles/create'
*/
CreatePsychologistProfileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: CreatePsychologistProfile.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

CreatePsychologistProfile.form = CreatePsychologistProfileForm

export default CreatePsychologistProfile