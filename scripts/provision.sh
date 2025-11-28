#!/bin/bash
set -e

echo "=== Updating system ==="
dnf -y update

echo "=== Enabling EPEL repository ==="
dnf -y install epel-release

echo "=== Installing Asterisk (EL9-compatible) ==="
dnf -y install asterisk asterisk-pjsip asterisk-voicemail

echo "=== Setting permissions for Asterisk directories ==="
for dir in /etc/asterisk /var/lib/asterisk /var/log/asterisk /var/spool/asterisk /run/asterisk; do
    mkdir -p "$dir"
    chown -R asterisk:asterisk "$dir"
    chmod -R 750 "$dir"
done

echo "=== Enabling and starting Asterisk ==="
systemctl enable --now asterisk

echo "=== Deploying configuration files ==="
cp /vagrant/pjsip.conf /etc/asterisk/pjsip.conf
cp /vagrant/extensions.conf /etc/asterisk/extensions.conf
cp /vagrant/confbridge.conf /etc/asterisk/confbridge.conf
cp /vagrant/rtp.conf /etc/asterisk/rtp.conf

chown -R asterisk:asterisk /etc/asterisk

echo "=== Restarting Asterisk to load configs ==="
systemctl restart asterisk

echo "=== Waiting for Asterisk to initialize ==="
sleep 5

echo "=== Verifying Asterisk installation ==="
sudo -u asterisk asterisk -rx "core show version"
sudo -u asterisk asterisk -rx "module show like confbridge"

echo "=== Asterisk Provisioning Completed Successfully ==="
