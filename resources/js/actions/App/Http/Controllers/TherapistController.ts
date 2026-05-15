import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/therapists',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::index
* @see app/Http/Controllers/TherapistController.php:12
* @route '/therapists'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:20
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
* @see app/Http/Controllers/TherapistController.php:20
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
* @see app/Http/Controllers/TherapistController.php:20
* @route '/therapists/{psychologistProfile}'
*/
show.get = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:20
* @route '/therapists/{psychologistProfile}'
*/
show.head = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:20
* @route '/therapists/{psychologistProfile}'
*/
const showForm = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:20
* @route '/therapists/{psychologistProfile}'
*/
showForm.get = (args: { psychologistProfile: number | { id: number } } | [psychologistProfile: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TherapistController::show
* @see app/Http/Controllers/TherapistController.php:20
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

const TherapistController = { index, show }

export default TherapistController