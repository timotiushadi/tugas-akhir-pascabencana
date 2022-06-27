// Chart Bar #1
    // Setup Block
    $(function() {
        const json_url = './src/scripts/data/chart/chart.php';
        
        const data = {
            labels: [],
                datasets: [{
                    label: 'Jumlah Korban Meninggal 3 Tahun terakhir',
                    data: [],
                    backgroundColor: 'rgba(248, 000, 000)'
                },
                {
                    label: 'Jumlah Korban Hilang 3 Tahun terakhir',
                    data: [],
                    backgroundColor: 'rgba(214, 174, 001)'
                },
                {
                    label: 'Jumlah Korban Luka Berat 3 Tahun terakhir',
                    data: [],
                    backgroundColor: 'rgba(255, 164, 032)'
                },
                {
                    label: 'Jumlah Korban Luka Ringan 3 Tahun terakhir',
                    data: [],
                    backgroundColor: 'rgba(042, 100, 120)'
                }
            ]
        };
    
        // Config block
        const config = {
            type: 'bar',
            data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    animatescale: true,
                    responsive: false,
                    // maintainAspectRatio: false
                    title: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        text: 'Jumlah Korban 3 tahun terakhir'
                    },
                }
        }
    
        // Render Block
        const barChart = new Chart(document.getElementById('barChart'), config);

        ajax_chart(barChart, json_url);

        function ajax_chart(chart,url, data) {
            var data = data || {};
        
            $.getJSON(url, data).done(function(response){
                chart.data.labels = response.year;
                chart.data.datasets[0].data = response.dead_total;
                chart.data.datasets[1].data = response.missing_total;
                chart.data.datasets[2].data = response.serious_woundTotal;
                chart.data.datasets[3].data = response.minor_injuriesTotal;
                chart.update();
            });
        };
    });
    

// Chart Doughnut #1
    // Setup Block
        $(function(){
        const json_url2 = './src/scripts/data/chart/chart2.php';

        const data2 = {
            labels: [],
            datasets: [{
                label: 'Jumlah Bencana Tahun Ini',
                data: [],
                backgroundColor: [
                'rgba(201, 060, 032, 0.8)',
                'rgba(245, 40, 145, 0.8)',
                'rgba(255, 035, 001, 0.8)',
                'rgba(202, 196, 176, 0.8)',
                'rgba(208, 208, 208, 0.8)',
                'rgba(118, 060, 040, 0.8)',
                'rgba(070, 069, 049, 0.8)',
                'rgba(059, 131, 189, 0.8)',
                'rgba(153, 153, 080, 0.8)',
                'rgba(229, 190, 001, 0.8)',
                'rgba(038, 037, 045, 0.8)',
                'rgba(074, 025, 044, 0.8)',
                'rgba(069, 050, 046, 0.8)',
                'rgba(029, 051, 074, 0.8)'
                ],
                hoverOffset: 4
            }]
        };

        // Config block
        const config2 = {
            type: 'pie',
            data: data2,
            options: {
                legend: {
                    position: 'bottom',
                    labels:{
                        boxWidth: 12
                    }
                },
                // maintainAspectRatio: false
                animation: {
                    animateScale:true,
                },
                
                plugins: {
                    datalabels: {
                        display: true,
                        color: '#fff',
                        anchor: 'end',
                        align:'start',
                        offset: -10,
                        borderWidth: 2,
                        borderColor: '#fff',
                        borderRadius:25,
                        bacgroundColor: (contex) => {
                            return contex.dataset.backgroundColor;
                        }
                    },
                    title: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        text: 'Jumlah Bencana Tahun Ini'
                    }
                }
            }
        }

        // Render Block
        const doughnutChart = new Chart(document.getElementById('doughnutChart'), config2);

        ajax_chart2(doughnutChart, json_url2);

        function ajax_chart2(chart,url, data) {
            var data = data || {};
        
            $.getJSON(url, data).done(function(response){
                chart.data.labels = response.label;
                chart.data.datasets[0].data = response.data;
                chart.update();
            });
        };
    });

// Chart Doughnut #2
    //Setup Block
    $(function(){
        const json_url3 = './src/scripts/data/chart/chart3.php';

        const data3 = {
            labels: [],
            datasets: [{
                label: 'Jumlah Bencana Tahun Lalu',
                data: [],
                backgroundColor: [
                'rgba(201, 060, 032, 0.8)',
                'rgba(245, 40, 145, 0.8)',
                'rgba(255, 035, 001, 0.8)',
                'rgba(202, 196, 176, 0.8)',
                'rgba(208, 208, 208, 0.8)',
                'rgba(118, 060, 040, 0.8)',
                'rgba(070, 069, 049, 0.8)',
                'rgba(059, 131, 189, 0.8)',
                'rgba(153, 153, 080, 0.8)',
                'rgba(229, 190, 001, 0.8)',
                'rgba(038, 037, 045, 0.8)',
                'rgba(074, 025, 044, 0.8)',
                'rgba(069, 050, 046, 0.8)',
                'rgba(029, 051, 074, 0.8)'
                ],
                hoverOffset: 4
            }]
        };

        // Config block
        const config3 = {
            type: 'pie',
            data: data3,
            options: {
                
                animation: {
                    animatescale:true,
                },
                legend: {
                    position: 'bottom',
                    labels:{
                        boxWidth: 12
                    }
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: '#fff',
                        anchor: 'end',
                        align:'start',
                        offset: -10,
                        borderWidth: 2,
                        borderColor: '#fff',
                        borderRadius:25,
                        bacgroundColor: (contex) => {
                            return contex.dataset.backgroundColor;
                        }
                    },
                    title: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        text: 'Jumlah Bencana Tahun Lalu'
                    }
                },
                maintainAspectRatio: true
            }
        }

        // Render Block
        const doughnutChart2 = new Chart(document.getElementById('doughnutChart2'), config3);

        ajax_chart2(doughnutChart2, json_url3);

        function ajax_chart2(chart,url, data) {
            var data = data || {};
        
            $.getJSON(url, data).done(function(response){
                chart.data.labels = response.label;
                chart.data.datasets[0].data = response.data;
                chart.update();
            });
        };
    });



