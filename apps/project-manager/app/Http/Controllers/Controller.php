<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function paginating(Builder $query)
    {
        if (request()->exists(['limit', 'page'])) {
            $limit = intval(request()->get('limit'));
            $page = request()->get('page');

            return $query->paginate($limit, ['*'], 'page', $page);
        } else {
            Log::error('Pagination making error : No parameters limit and page');
            return [];
        }
    }

    public function searching(Builder $query)
    {
        if (request()->exists('search')) {
            $search = request()->get('search');

            $columns = $query->getModel()->getFillable();

            if ($search !== '') {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%' . $search . '%');
                }
            }
        }
    }

    public function filtering(Builder $query)
    {
        $filtersNotFillable = [];
        if (request()->exists('filters')) {
            $filters = json_decode(request()->get('filters'), true);

            foreach ($filters as $key => $filter) {
                if (is_array($filter)) {
                    if (!empty($filter)) {
                        foreach ($filter as $keyItem => $item) {
                            if (in_array($keyItem, $query->getModel()->getFillable())) {
                                $query->where($key, 'like', '%' . $item . '%');
                            } else {
                                $filtersNotFillable[$keyItem] =  $item;
                            }
                        }
                    }
                } else {
                    if ($filter !== '') {
                        if (in_array($key, $query->getModel()->getFillable())) {
                            switch (gettype($filter)) {
                                case 'boolean':
                                    $query->where($key,  $filter);
                                    break;
                                case 'string':
                                default:
                                    $query->where($key, 'like', '%' . $filter . '%');
                                    break;
                            }
                        } else {
                            $filtersNotFillable[$key] = $filter;
                        }
                    }
                }
            }
        }
        return $filtersNotFillable;
    }

    public function filteringNotFillable(Builder $query, array $filtersNotFillable)
    {
        // CLIENT_NAME --> Project->belongsTo('Agency')->belongsTo('Client')->name
        if (array_key_exists('client_name', $filtersNotFillable)) {
            $needle = $filtersNotFillable['client_name'];
            $nameLikeNeedle = function ($query) use($needle) {
                $query->where('name', 'like', '%'.$needle.'%');
            };

            $query->with(['agency.client' => $nameLikeNeedle])->whereHas('agency.client', $nameLikeNeedle);
        }
    }

    public function ordering(Builder $query)
    {
        if (request()->exists('orderBy')) {
            $orderBy = request()->get('orderBy');

            if ($orderBy[0] !== '' && $orderBy[1] !== '') {
                if (strpos($orderBy[0], 'dateNext') !== false && $orderBy[1] === 'asc') {
                    //$query->orderBy('-' . $orderBy[0], 'desc');
                    $query->where($orderBy[0], '!=', '');
                    $query->orderBy($orderBy[0], $orderBy[1]);
                } else {
                    $query->orderBy($orderBy[0], $orderBy[1]);
                }
            }
        }
    }
}
