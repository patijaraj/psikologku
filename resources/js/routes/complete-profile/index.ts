import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/complete-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::edit
* @see app/Http/Controllers/Auth/CompleteProfileController.php:13
* @route '/complete-profile'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::update
* @see app/Http/Controllers/Auth/CompleteProfileController.php:23
* @route '/complete-profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/complete-profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::update
* @see app/Http/Controllers/Auth/CompleteProfileController.php:23
* @route '/complete-profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::update
* @see app/Http/Controllers/Auth/CompleteProfileController.php:23
* @route '/complete-profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::update
* @see app/Http/Controllers/Auth/CompleteProfileController.php:23
* @route '/complete-profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\CompleteProfileController::update
* @see app/Http/Controllers/Auth/CompleteProfileController.php:23
* @route '/complete-profile'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const completeProfile = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default completeProfile