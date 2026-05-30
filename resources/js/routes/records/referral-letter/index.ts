import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReferralLetterController::store
* @see app/Http/Controllers/ReferralLetterController.php:21
* @route '/records/{appointment}/referral-letter'
*/
export const store = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/records/{appointment}/referral-letter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReferralLetterController::store
* @see app/Http/Controllers/ReferralLetterController.php:21
* @route '/records/{appointment}/referral-letter'
*/
store.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { appointment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        appointment: typeof args.appointment === 'object'
        ? args.appointment.id
        : args.appointment,
    }

    return store.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReferralLetterController::store
* @see app/Http/Controllers/ReferralLetterController.php:21
* @route '/records/{appointment}/referral-letter'
*/
store.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::store
* @see app/Http/Controllers/ReferralLetterController.php:21
* @route '/records/{appointment}/referral-letter'
*/
const storeForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::store
* @see app/Http/Controllers/ReferralLetterController.php:21
* @route '/records/{appointment}/referral-letter'
*/
storeForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
export const show = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/records/{appointment}/referral-letter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
show.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { appointment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        appointment: typeof args.appointment === 'object'
        ? args.appointment.id
        : args.appointment,
    }

    return show.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
show.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
show.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
const showForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
showForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::show
* @see app/Http/Controllers/ReferralLetterController.php:11
* @route '/records/{appointment}/referral-letter'
*/
showForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
export const pdf = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/records/{appointment}/referral-letter/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
pdf.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { appointment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        appointment: typeof args.appointment === 'object'
        ? args.appointment.id
        : args.appointment,
    }

    return pdf.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
pdf.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
pdf.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
const pdfForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
pdfForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReferralLetterController::pdf
* @see app/Http/Controllers/ReferralLetterController.php:41
* @route '/records/{appointment}/referral-letter/pdf'
*/
pdfForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdf.form = pdfForm

const referralLetter = {
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    pdf: Object.assign(pdf, pdf),
}

export default referralLetter