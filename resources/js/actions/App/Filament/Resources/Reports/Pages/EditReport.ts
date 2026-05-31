import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
const EditReport = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditReport.url(args, options),
    method: 'get',
})

EditReport.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
EditReport.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditReport.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
EditReport.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
EditReport.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditReport.url(args, options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
const EditReportForm = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
EditReportForm.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Reports\Pages\EditReport::__invoke
* @see app/Filament/Resources/Reports/Pages/EditReport.php:7
* @route '/admin/reports/{record}/edit'
*/
EditReportForm.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: EditReport.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

EditReport.form = EditReportForm

export default EditReport