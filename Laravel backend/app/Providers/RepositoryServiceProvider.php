<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\DashboardContract;
use App\Repositories\DashboardRepository;
use App\Contracts\InventoryContract;
use App\Repositories\InventoryRepository;
use App\Contracts\OrderContract;
use App\Repositories\OrderRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(DashboardContract::class, DashboardRepository::class);
        $this->app->bind(InventoryContract::class, InventoryRepository::class);
        $this->app->bind(OrderContract::class, OrderRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
