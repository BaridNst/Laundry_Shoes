<?php

namespace App\Repositories;

use App\Contracts\OrderContract;
use App\Models\Antrean;

class OrderRepository implements OrderContract
{
    public function getAllOrders()
    {
        return Antrean::orderBy('id', 'desc')->get();
    }

    public function getOrderById($id)
    {
        $antrean = Antrean::find($id);
        if (!$antrean) {
            $antrean = Antrean::where('kode_antrean', $id)->first();
        }
        return $antrean;
    }

    public function createOrder(array $data)
    {
        // Generate Kode Antrean
        $latest = Antrean::orderBy('id', 'desc')->first();
        if ($latest) {
            $lastNumber = intval(substr($latest->kode_antrean, 3));
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
            $data['kode_antrean'] = 'ANT' . $newNumber;
        } else {
            $data['kode_antrean'] = 'ANT001';
        }

        return Antrean::create($data);
    }

    public function updateOrder($id, array $data)
    {
        $antrean = $this->getOrderById($id);
        if ($antrean) {
            $antrean->update($data);
            return $antrean;
        }
        return null;
    }
}