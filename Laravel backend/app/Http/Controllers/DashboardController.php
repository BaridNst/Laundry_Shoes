<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index()
    {
        return response()->json([
            'antrean_aktif' => $this->dashboardService->getActiveOrdersCount(),
            'selesai_hari_ini' => $this->dashboardService->getCompletedTodayCount(),
            'peringatan_stok' => $this->dashboardService->getLowStockCount(),
        ]);
    }

    public function laporanKeuangan()
    {
        return response()->json($this->dashboardService->getLaporanKeuangan());
    }
}
