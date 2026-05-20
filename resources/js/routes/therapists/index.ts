import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
export const show = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/therapists/{psychologistProfile}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
show.url = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { psychologistProfile: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { psychologistProfile: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            psychologistProfile: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        psychologistProfile: typeof args.psychologistProfile === 'object'
        ? args.psychologistProfile.id
        : args.psychologistProfile,
    }

    return show.definition.url
            .replace('{psychologistProfile}', parsedArgs.psychologistProfile.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
show.get = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
show.head = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
const showForm = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
showForm.get = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:21
* @route '/therapists/{psychologistProfile}'
*/
showForm.head = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const therapists = {
    show: Object.assign(show, show),
}

export default therapists