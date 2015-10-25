Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise32"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.synced_folder "./www", "/var/www"
  config.vm.synced_folder "./data", "/vagrant_data"
  config.vm.network :forwarded_port, guest: 80, host: 4567
end