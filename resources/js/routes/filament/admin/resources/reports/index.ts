import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ListReports::__invoke
* @see app/Filament/Resources/Reports/Pages/ListReports.php:7
* @route '/admin/reports'
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
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\CreateReport::__invoke
* @see app/Filament/Resources/Reports/Pages/CreateReport.php:7
* @route '/admin/reports/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
export const view = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{record}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
view.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return view.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
view.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
view.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
const viewForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
viewForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\ViewReport::__invoke
* @see app/Filament/Resources/Reports/Pages/ViewReport.php:7
* @route '/admin/reports/{record}'
*/
viewForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

view.form = viewForm

const reports = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    view: Object.assign(view, view),
}

export default reports