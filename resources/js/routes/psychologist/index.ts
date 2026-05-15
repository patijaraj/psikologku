import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:104
* @route '/psychologist/availability'
*/
export const availability = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: availability.url(options),
    method: 'patch',
})

availability.definition = {
    methods: ["patch"],
    url: '/psychologist/availability',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:104
* @route '/psychologist/availability'
*/
availability.url = (options?: RouteQueryOptions) => {
    return availability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:104
* @route '/psychologist/availability'
*/
availability.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: availability.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:104
* @route '/psychologist/availability'
*/
const availabilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: availability.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:104
* @route '/psychologist/availability'
*/
availabilityForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: availability.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

availability.form = availabilityForm

const psychologist = {
    profile: Object.assign(profile, profile),
    availability: Object.assign(availability, availability),
}

export default psychologist