import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/psychologist/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::index
* @see app/Http/Controllers/PsychologistAppointmentController.php:11
* @route '/psychologist/appointments'
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

const PsychologistAppointmentController = { index }

export default PsychologistAppointmentController