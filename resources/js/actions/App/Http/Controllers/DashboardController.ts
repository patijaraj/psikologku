import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::show
* @see app/Http/Controllers/DashboardController.php:12
* @route '/dashboard'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\DashboardController::updateAvailability
* @see app/Http/Controllers/DashboardController.php:58
* @route '/psychologist/availability'
*/
export const updateAvailability = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateAvailability.url(options),
    method: 'patch',
})

updateAvailability.definition = {
    methods: ["patch"],
    url: '/psychologist/availability',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DashboardController::updateAvailability
* @see app/Http/Controllers/DashboardController.php:58
* @route '/psychologist/availability'
*/
updateAvailability.url = (options?: RouteQueryOptions) => {
    return updateAvailability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::updateAvailability
* @see app/Http/Controllers/DashboardController.php:58
* @route '/psychologist/availability'
*/
updateAvailability.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateAvailability.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::updateAvailability
* @see app/Http/Controllers/DashboardController.php:58
* @route '/psychologist/availability'
*/
const updateAvailabilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvailability.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::updateAvailability
* @see app/Http/Controllers/DashboardController.php:58
* @route '/psychologist/availability'
*/
updateAvailabilityForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvailability.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateAvailability.form = updateAvailabilityForm

const DashboardController = { show, updateAvailability }

export default DashboardController