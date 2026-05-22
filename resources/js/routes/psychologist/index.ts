import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import appointments40eafc from './appointments'
import schedules from './schedules'
/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/psychologist/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appointments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appointments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PsychologistAppointmentController::appointments
* @see app/Http/Controllers/PsychologistAppointmentController.php:14
* @route '/psychologist/appointments'
*/
appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: appointments.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

appointments.form = appointmentsForm

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
export const records = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})

records.definition = {
    methods: ["get","head"],
    url: '/psychologist/records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
records.url = (options?: RouteQueryOptions) => {
    return records.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
records.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
records.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: records.url(options),
    method: 'head',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
const recordsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: records.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
recordsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: records.url(options),
    method: 'get',
})

/**
* @see \Inertia\Controller::__invoke
* @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
* @route '/psychologist/records'
*/
recordsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: records.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

records.form = recordsForm

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:172
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
* @see app/Http/Controllers/DashboardController.php:172
* @route '/psychologist/availability'
*/
availability.url = (options?: RouteQueryOptions) => {
    return availability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:172
* @route '/psychologist/availability'
*/
availability.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: availability.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DashboardController::availability
* @see app/Http/Controllers/DashboardController.php:172
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
* @see app/Http/Controllers/DashboardController.php:172
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
    appointments: Object.assign(appointments, appointments40eafc),
    records: Object.assign(records, records),
    schedules: Object.assign(schedules, schedules),
    availability: Object.assign(availability, availability),
}

export default psychologist