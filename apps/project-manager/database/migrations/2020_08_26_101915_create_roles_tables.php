<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function ($collection) {
            $collection->unique('name');
            $collection->string('label')->nullable();
            $collection->timestamps();
        });

        Schema::create('abilities', function ($collection) {
            $collection->unique('name');
            $collection->string('label')->nullable();
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
