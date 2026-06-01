import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/user-profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserProfileController::edit
* @see app/Http/Controllers/UserProfileController.php:11
* @route '/user-profile'
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
* @see \App\Http\Controllers\UserProfileController::update
* @see app/Http/Controllers/UserProfileController.php:18
* @route '/user-profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/user-profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserProfileController::update
* @see app/Http/Controllers/UserProfileController.php:18
* @route '/user-profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserProfileController::update
* @see app/Http/Controllers/UserProfileController.php:18
* @route '/user-profile'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserProfileController::update
* @see app/Http/Controllers/UserProfileController.php:18
* @route '/user-profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserProfileController::update
* @see app/Http/Controllers/UserProfileController.php:18
* @route '/user-profile'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

const userProfile = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default userProfile